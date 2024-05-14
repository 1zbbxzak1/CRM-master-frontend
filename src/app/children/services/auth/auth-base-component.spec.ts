import {TestBed} from '@angular/core/testing';

import {ExternalAuthVkService} from './auth-base-component';

describe('ExternalAuthVkService', () => {
    let service: ExternalAuthVkService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ExternalAuthVkService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
