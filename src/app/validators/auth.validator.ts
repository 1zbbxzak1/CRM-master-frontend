import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

export class ValidAuth {
    private readonly _formGroup!: FormGroup;

    constructor(
        formGroup: FormGroup
    ) {
        this._formGroup = formGroup;
    }

    public getFormControl(controlName: string): AbstractControl | null {
        return this._formGroup!.get(controlName);
    }

    public isControlError(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.invalid && (control.dirty || control.touched);
    }

    public isControlRequired(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('required');
    }

    public isCorrectFullName(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('invalidFullName');
    }

    public isEmailInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('email');
    }

    public isCorrectPhoneNumber(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('invalidPhoneNumber');
    }

    public isPasswordInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('minlength');
    }
}


export function fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const fullName: string = control.value;
        const fullNamePattern: RegExp = /^[a-zA-Zа-яА-Я]+(\s+[a-zA-Zа-яА-Я]+){2}$/;

        if (!fullNamePattern.test(fullName)) {
            return {'invalidFullName': {value: control.value}};
        }
        return null;
    };
}

export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const fullName: string = control.value;
        const fullNamePattern: RegExp = /^(\+7)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

        if (!fullNamePattern.test(fullName)) {
            return {'invalidPhoneNumber': {value: control.value}};
        }
        return null;
    };
}
