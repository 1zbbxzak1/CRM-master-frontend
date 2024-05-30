import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConstructorMainComponent} from './constructor-main.component';

describe('TemplatePreviewComponent', () => {
    let component: ConstructorMainComponent;
    let fixture: ComponentFixture<ConstructorMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConstructorMainComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ConstructorMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
