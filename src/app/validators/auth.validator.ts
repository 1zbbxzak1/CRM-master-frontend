import {AbstractControl, FormGroup} from "@angular/forms";

export class ValidAuth {
    private formGroup!: FormGroup;

    constructor(formGroup: FormGroup) {
        this.formGroup = formGroup;
    }

    public getFormControl(controlName: string): AbstractControl | null {
        return this.formGroup!.get(controlName);
    }

    public isControlError(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.invalid && (control.dirty || control.touched);
    }

    public isControlRequired(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('required');
    }

    public isEmailInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('email');
    }

    public isPasswordInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('minlength');
    }
}
