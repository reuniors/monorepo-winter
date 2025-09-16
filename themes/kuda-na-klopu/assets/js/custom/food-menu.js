var foodAdvanceDialog;
function AddOn(title, price, addonGroup) {
    var self = this;

    price = price ? parseFloat(price) : 0;
    self.title = title;
    self.price = price;
    self.Selected = ko.observable(false);
    self.addonGroup = addonGroup
}

function AddOnGroup(addonGroup) {
    var self = this;

    self.title = addonGroup.title;
    self.isExclusive = addonGroup.isExclusive
    self.inputType = addonGroup.inputType
    self.type = addonGroup.type
    self.SelectedAddon = ko.observable(null)
    self.foodAddons = []
    self.foodAddonsOriginal = []
    self.setFoodAddons = function (foodAddons) {
        self.foodAddons = ko.observable(foodAddons)
        self.foodAddonsOriginal = foodAddons
    }
    if (addonGroup.foodAddons && addonGroup.foodAddons.length) {
        self.setFoodAddons(addonGroup.foodAddons)
    }
}

function Food({ id, title, description, image, price, foodAddonGroups }) {
    var self = this;

    price = price ? parseFloat(price) : 0;
    self.id = id
    self.title = title;
    self.description = description
    self.image = ko.observable(image);
    self.price = ko.observable(price);
    self.selectedType = ko.observable(null)
    self.quantity = ko.observable(1)
    self.foodAddonGroups = []
    self.foodAddons = []
    self.isCurrent = false
    self.isAdded = false
    var calculateAddonsPrices = () => self.foodAddons
        .filter(item => item.Selected())
        .map(item => item.price)
        .reduce((totalPrice, price) => totalPrice + parseFloat(price), 0)
    self.realPrice = ko.pureComputed(function() {
        var sumAddonsPrices = self.foodAddons.length ? calculateAddonsPrices() : 0
        return self.price() + sumAddonsPrices
    });
    self.subtotal = ko.pureComputed(function() {
        return parseFloat(self.realPrice() * self.quantity());
    });
    self.checkHasRequired = function () {
        if (self.foodAddonGroups.length === 0) {
            return false
        }
        var hasRequired = false
        self.foodAddonGroups.forEach(function (foodAddonGroup) {
            if (foodAddonGroup.isExclusive) {
                hasRequired = true
                return null;
            }
        })
        return hasRequired
    }
    self.validateRequired = function () {
        if (self.foodAddonGroups.length === 0) {
            return true
        }
        var hasValidRequired = true
        self.foodAddonGroups.forEach(function (foodAddonGroup) {
            if (foodAddonGroup.isExclusive && !foodAddonGroup.SelectedAddon()) {
                hasValidRequired = false
                return null
            }
        })
        return hasValidRequired
    }
    self.transformFoodAddonsGroups = function (foodAddonGroups) {
        self.foodAddonGroups = []
        self.foodAddons = []
        if (foodAddonGroups) {
            foodAddonGroups.forEach(function (foodAddonGroupItem) {
                var newFoodAddonGroup = new AddOnGroup({
                    title: foodAddonGroupItem.title,
                    isExclusive: foodAddonGroupItem.combine_type === 'exclusively',
                    foodAddons: [],
                    inputType: foodAddonGroupItem.input_type,
                    type: foodAddonGroupItem.type,
                })
                var newFoodAddons = getAddons(foodAddonGroupItem.food_addons, newFoodAddonGroup)
                newFoodAddonGroup.setFoodAddons(newFoodAddons)
                self.foodAddonGroups.push(newFoodAddonGroup)
                if (foodAddonGroupItem.type === 'size' || newFoodAddonGroup.isExclusive) {
                    self.price(0)
                }
            })
        }
    }
    self.setFoodAddonsGroups = function (addOnGroups) {
        self.foodAddonGroups = []
        self.foodAddons = []
        var tempFoodAddons = []
        addOnGroups.forEach(function (groupItem) {
            var clonedAddonGroup = new AddOnGroup(groupItem)
            groupItem.foodAddonsOriginal.forEach(function (foodItem) {
                var tempAddOn = new AddOn(foodItem.title, foodItem.price, groupItem)
                tempFoodAddons.push(tempAddOn)
                tempAddOn.addonGroup = clonedAddonGroup
                self.foodAddons.push(tempAddOn)
            })
            clonedAddonGroup.setFoodAddons(tempFoodAddons)
            self.foodAddonGroups.push(clonedAddonGroup)
            tempFoodAddons = []
        })
    }
    var getAddons = function (foodAddons, foodAddonGroup) {
        var returnAddons = []
        var groupIsSize = foodAddonGroup.type === 'size'
        foodAddons.forEach(function (foodAddonItem) {
            var price = groupIsSize
                ? foodAddonItem.overridden_price
                : foodAddonItem.price
            var newFoodAddons =  new AddOn(
                foodAddonItem.title,
                price,
                foodAddonGroup
            )
            if (!groupIsSize || price) {
                returnAddons.push(newFoodAddons)
                self.foodAddons.push(newFoodAddons)
            }
        })
        return returnAddons
    }
    if (foodAddonGroups && foodAddonGroups.length) {
        self.setFoodAddonsGroups(foodAddonGroups)
    }
}

function MyViewModel() {
    var self = this
    self.locationSlug = null
    self.foodList = {}
    self.currentData = {}
    self.showRequiredMessage = ko.observable(false)
    self.shoppingCartData = ko.observableArray([])
    self.updatingFoodData = ko.observable(false)
    self.foodMenuSimpleMode = ko.observable(false)
    self.foodMenuEditMode = ko.observable(false)
    self.foodSimpleModeLoaded = ko.observable(false)
    self.foodEditModeLoaded = ko.observable(false)
    self.cartDataName = function (item) {
        return item.title + item.selectedType().title
    }
    self.initCreateCurrentData = function (name) {
        var food = this.foodList[name]
        self.currentData = new Food(food)
    }
    self.initUpdateCurrentData = function (item) {
        foodAdvanceDialog = bootbox.dialog({
            title: null,
            onEscape: true,
            backdrop: true,
            message: `<div id="foodAdvancedPopup">\
                <div data-bind="template: { name: \'food-popup-template\', data: currentData }">\
                    <a class="text-muted oc-loading">Učitavanje...</a>\
                </div>\
            </div>`
        });
        foodAdvanceDialog.on('shown.bs.modal', function (e) {
            ko.applyBindings(self, $('#foodAdvancedPopup')[0]);
        });
        foodAdvanceDialog.on('hide.bs.modal', function () {
            self.updatingFoodData(false)
        })
        self.currentData = item
        self.updatingFoodData(true)
    }
    self.checkAddons = function (item, otherItem) {
        var selectedAddOns = item.foodAddons
            .filter(addOn => {
                return addOn.Selected()
            })
            .map(addOn => {
                return {
                    title: addOn.title,
                    addonGroupTitle: addOn.addonGroup.title,
                }
            })
        var selectedAddOnsOther = otherItem.foodAddons
            .filter(addOn => {
                return addOn.Selected()
            })
            .map(addOn => {
                return {
                    title: addOn.title,
                    addonGroupTitle: addOn.addonGroup.title,
                }
            })
        return JSON.stringify(selectedAddOns) === JSON.stringify(selectedAddOnsOther)
    }
    self.addToShoppingCart = function (item) {
        var existingCartData = ko.utils.arrayFirst(self.shoppingCartData(), function(otherItem) {
            return otherItem.title === item.title
                && self.checkAddons(item, otherItem)
                && ((
                    !item.selectedType()
                    && !otherItem.selectedType()
                ) || (
                    item.selectedType()
                    && otherItem.selectedType()
                    && otherItem.selectedType().title === item.selectedType().title
                ));
        });
        if (!item.checkHasRequired() && !item.price()) {
            return false
        }
        if (existingCartData) {
            existingCartData.quantity(existingCartData.quantity() + item.quantity())
        } else if(item.validateRequired()) {
            self.shoppingCartData.push(Object.assign({}, item))
            item.isAdded = true
        } else {
            self.showRequiredMessage(true)
            return false
        }
        self.showRequiredMessage(false)
        foodAdvanceDialog.modal('hide')
    }
    self.deleteFromShoppingCart = function(item) {
        self.shoppingCartData.remove(item)
    }
    self.subQuantity = function(item) {
        if (item.quantity() > 1) {
            item.quantity(item.quantity() - 1)
        }
    }
    self.addQuantity = function(item) {
        item.quantity(item.quantity() + 1)
    }
    self.toggleAssociation = function (item) {
        if (item.addonGroup.isExclusive) {
            var getLastSelected = item.addonGroup.SelectedAddon()
            item.addonGroup.SelectedAddon(item)
            if (getLastSelected) {
                getLastSelected.Selected(false);
            }
            item.Selected(true);
        } else {
            item.Selected(!(item.Selected()));
        }
        return true;
    };
    self.toggleSelectType = function (item) {
        self.currentData.selectedType(item)
    }
    self.grandTotal = ko.pureComputed(function() {
        var total = 0;
        $.each(self.shoppingCartData(), function() { total += this.subtotal() })
        return total;
    });
    self.openCart = ko.observable(false);
    self.toggleCart = function () {
        $('#nav-menu-tab').click()
        self.openCart(!self.openCart())
    };
    self.toggleSimpleFoodMenuMode = function () {
        self.foodMenuSimpleMode(!self.foodMenuSimpleMode())
        if (!self.foodSimpleModeLoaded()) {
            self.foodSimpleModeLoaded(true)
            $.request('foodMenuData::onShowMenu', {
                update: { 'components/location/fragments/menuTableSimple': '#FoodMenuSimple' },
                error: function () {
                    self.foodSimpleModeLoaded(false)
                },
                data: {
                    locationSlug: self.locationSlug
                }
            })
        }
    }
    self.toggleFoodMenuEditMode = function () {
        self.foodMenuEditMode(!self.foodMenuEditMode())
        if (!self.foodEditModeLoaded()) {
            self.foodEditModeLoaded(true)
            $.request('locationData::onRunOriginal', {
                update: { 'components/location/fragments/edit/menuTableEditMode': '#FoodMenuEdit' },
                error: function () {
                    self.foodEditModeLoaded(false)
                },
            })
        }
    }
    self.foodMenuModeIcon = ko.pureComputed(function() {
        return self.foodMenuSimpleMode() ? 'fa-book' : 'fa-receipt'
    })
    self.foodMenuEditModeIcon = ko.pureComputed(function() {
        return self.foodMenuEditMode() ? 'fa-window-close-o' : 'fa-pencil-square-o'
    })
}
