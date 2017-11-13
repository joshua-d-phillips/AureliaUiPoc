import { bindable } from "aurelia-framework";

export class NavMenu {
    @bindable router = null;

    constructor() {
        this.dropdownOpen = false;
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    navigateDropdown(url) {
        this.toggleDropdown();

        this.router.navigate(url);
    }
}