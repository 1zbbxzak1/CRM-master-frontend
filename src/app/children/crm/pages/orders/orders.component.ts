import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";
import {SettingsComponent} from "./components/settings/settings.component";
import {StateBarService} from "../../services/state-bar/state-bar.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/orders.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent extends StateBarService implements OnInit {
    protected search: string = '';
    protected isSettingsClicked: boolean = false;
    @ViewChild(SettingsComponent)
    private readonly _settingsComponent!: SettingsComponent;

    override ngOnInit(): void {
        this.toggleStateTabs('isAllOrders');
        this.toggleStateSidebar('isOrdersClicked');
    }


    // TODO: фильтрация для поиска
    // get filteredOrders() {
    //     return this.search ?
    //         this.rows.filter(order => order.some(cell => cell.toLowerCase().includes(this.search.toLowerCase()))) :
    //         this.rows;
    // }

    protected openDialogSettings(
        settings: PolymorpheusContent<TuiDialogContext>,
    ) {
        this.isSettingsClicked = !this.isSettingsClicked;
        this._settingsComponent.openDialogSettings(settings);
    }
}
