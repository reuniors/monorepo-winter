<?php namespace Reuniors\Reservations\FormWidgets;

use Backend\Classes\FormWidgetBase;

class ArrayOfStrings extends FormWidgetBase
{
    /**
     * @inheritDoc
     */
    protected $defaultAlias = 'arrayofstrings';

    /**
     * @inheritDoc
     */
    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('arrayofstrings');
    }

    /**
     * @inheritDoc
     */
    public function getSaveValue($value)
    {
        return implode(',', $value);
    }

    /**
     * @inheritDoc
     */
    public function loadAssets()
    {
        $this->addCss('css/arrayofstrings.css');
        $this->addJs('js/arrayofstrings.js');
    }

    /**
     * Prepares the form widget view data
     */
    public function prepareVars()
    {
        $this->vars['value'] = $this->getLoadValue();
    }
}
