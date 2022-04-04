import { createI18n } from 'vue-i18n';
import availableLanguages from './available-languages.yaml';
import datetimeFormats from './date-formats.yaml';
import numberFormats from './number-formats.yaml';
import enUSBase from './translations/en-US.yaml';

export const i18n = createI18n({
	legacy: false,
	locale: 'en-US',
	fallbackLocale: 'en-US',
	messages: {
		'en-US': enUSBase,
	},
	silentTranslationWarn: true,
	datetimeFormats,
	numberFormats,
});

export type Language = keyof typeof availableLanguages;

export const loadedLanguages: Language[] = ['en-US'];

