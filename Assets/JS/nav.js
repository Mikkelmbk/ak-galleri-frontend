let navUlElement = document.querySelector(".js-page-switcher");
let navHTML;
if (!window.location.pathname.includes('/admin/')) {
    navHTML = [
        {
            name: "Hjem",
            href: "/home/"
        },
        {
            name: "Originaler",
            href: "/originals/"
        },
        {
            name: "Gæster",
            href: "/guests/"
        },
        {
            name: "Rammer",
            href: "/frames/"
        },
        {
            name: "Kontakt",
            href: "/contact/"
        }
    ];
} else {
    navHTML = [
        {
            name: "Hjem",
            href: "/home/"
        },
        {
            name: "Se produkt",
            href: "/admin/view/"
        },
        {
            name: "Opret produkt",
            href: "/admin/create/"
        },
        {
            name: "Opdater produkt",
            href: "/admin/update/"
        },
        {
            name: "Slet produkt",
            href: "/admin/delete/"
        }
    ];
}

navHTML.forEach(function (item) {
    let li = document.createElement("li");
    li.classList.add("c-nav__li");

    let anchor = document.createElement("a");
    anchor.classList.add("c-nav__a");
    anchor.href = item.href;
    anchor.innerHTML = item.name;

    li.appendChild(anchor);
    navUlElement.appendChild(li);

    if (window.location.pathname === item.href) {
        anchor.classList.add("c-nav__a--active");
    }
});