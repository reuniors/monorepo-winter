;
(function () {
  System.register(['./vendor_react-legacy-BJQu1VnE.js', './vendor_ionic-legacy-C5RSb9DR.js'], function (exports, module) {
    'use strict';

    var jsxRuntimeExports, IonAvatar;
    return {
      setters: [module => {
        jsxRuntimeExports = module.j;
      }, module => {
        IonAvatar = module.be;
      }],
      execute: function () {
        const UserAvatar = exports("U", ({
          fullName,
          size = 48
        }) => {
          const getInitials = name => {
            const names = name.split(" ");
            if (names.length >= 2) {
              return `${names[0][0]}${names[1][0]}`.toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
          };
          const getRandomColor = name => {
            const colors = ["#FF6B6B",
            // Red
            "#4ECDC4",
            // Teal
            "#45B7D1",
            // Blue
            "#96CEB4",
            // Green
            "#FFEEAD",
            // Yellow
            "#D4A5A5",
            // Pink
            "#9B59B6",
            // Purple
            "#3498DB"
            // Light Blue
            ];
            const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return colors[index % colors.length];
          };
          const initials = getInitials(fullName);
          const backgroundColor = getRandomColor(fullName);
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonAvatar, {
            style: {
              width: `${size}px`,
              height: `${size}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor,
              color: "#FFFFFF",
              fontSize: `${size * 0.4}px`,
              fontWeight: "bold"
            },
            children: initials
          });
        });
      }
    };
  });
})();
