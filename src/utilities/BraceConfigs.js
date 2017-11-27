import languages from '../utilities/HighlightLanguages';
import themes from '../utilities/ColorSchemes';

languages.forEach((lang) => {
    require(`brace/mode/${lang}`);
    require(`brace/snippets/${lang}`);
});
themes.forEach((theme) => {
    require(`brace/theme/${theme}`);
});
