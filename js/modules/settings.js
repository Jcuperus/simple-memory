export class Settings
{
    EVENT_NEW_SETTINGS = 'new-settings';

    formElement;
    formData;

    constructor(formElement) {
        this.formElement = formElement;
        this.formData = new FormData(this.formElement);
        formElement.addEventListener('submit', this.onSave.bind(this));
    }

    onSave(event) {
        event.preventDefault();

        const newSettings = new FormData(this.formElement);
        if (!this.formData || !this.settingIsEqual(newSettings)) {
            this.formData = newSettings;
            this.formElement.dispatchEvent(new Event(this.EVENT_NEW_SETTINGS));
        }
    }

    settingIsEqual(newFormData) {
        for (let key of newFormData.keys()) {
            if (!this.formData.has(key) || newFormData.get(key) != this.formData.get(key)) {
                return false;
            }
        }

        return true;
    }

    registerSettingsHandler(eventHandler) {
        this.formElement.addEventListener(this.EVENT_NEW_SETTINGS, () => {
            eventHandler(this.formData);
        });
    }

    getSetting(key) {
        return this.formData.get(key);
    }
}