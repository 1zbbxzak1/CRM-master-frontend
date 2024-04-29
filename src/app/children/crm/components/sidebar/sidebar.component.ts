import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./styles/sidebar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {

    protected states: { [key: string]: boolean } = {
        isOrdersClicked: false,
        isClientsClicked: false,
        isProductsClicked: false,
        isShopClicked: false,
        isProfileClicked: false
    };

    constructor(private readonly _router: Router) {
    }

    ngOnInit(): void {
        const savedStates: string | null = localStorage.getItem('sidebarStates');
        if (savedStates) {
            this.states = JSON.parse(savedStates);
        } else {
            this.toggleState('isProfileClicked', 'profile');
        }
    }

    protected toggleState(stateName: string, route: string): void {
        const currentState: boolean = this.states[stateName];
        if (currentState) {
            return;
        }
        for (const key in this.states) {
            if (Object.prototype.hasOwnProperty.call(this.states, key)) {
                if (key !== stateName) {
                    this.states[key] = false;
                }
            }
        }
        this.states[stateName] = true;
        localStorage.setItem('sidebarStates', JSON.stringify(this.states));

        this._router.navigate([route]);
    }
}
