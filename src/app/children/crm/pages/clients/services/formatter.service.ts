export class FormatterService {
    public shortenFullName(fullName: string | undefined): string {
        if (!fullName) return '';

        const nameParts: string[] = fullName.split(' ');

        if (nameParts.length < 3) return fullName;

        return nameParts[0] + ' ' + nameParts[1].charAt(0) + '. ' + nameParts[2].charAt(0) + '.';
    }

    public formatPhoneNumber(phone: string | undefined): string {
        if (!phone) return '';

        const cleanedPhone: string = phone.replace(/\D/g, '');

        const groups: RegExpMatchArray = cleanedPhone.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/)!;

        if (!groups) return phone;

        return `+${groups[1]} ${groups[2]} ${groups[3]}-${groups[4]}-${groups[5]}`;
    }
}
