# LABORATORY PHRASE

[![Maintainability Status](https://api.codeclimate.com/v1/badges/f6f7ed79501f794ce74d/maintainability)](https://codeclimate.com/github/JustalK/LABORATORY-PHRASE/maintainability)

## Goal

This project is my laboratory and tutorial for phrase. Phrase is an app and api online that make the internalization of an app pretty easy.

The logic is quite simple, you create some localization files on your app, that you can upload to the app where anyone can make the translation. And then, you can pull all the translation into your app.

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

- [Documentation](#documentation)
- [Organization](#organization)
- [Development](#development)
- [Running](#running)
- [Commands](#commands)

## Documentation

#### Setup an account

First, you will need to get a project ID and a token for connecting to the app. Register on the following website : https://app.phrase.com/

![Alt text](documentation/images/1.png?raw=true "1")

Once done, create a project or use the default one already setup and save somewhere the **ProjectID**, you will need it.

![Alt text](documentation/images/2.png?raw=true "2")

You also gonna need a token for accessing the app with the in context plugin.

![Alt text](documentation/images/3.png?raw=true "3")

![Alt text](documentation/images/4.png?raw=true "4")

![Alt text](documentation/images/5.png?raw=true "5")

You can also save it somwhere, you will also need it.

#### Install i18n

```bash
$ npm install react-i18next i18next i18next-phrase-in-context-editor-post-processor --save
```

#### Create the locale

Create the locales files inside the **public** (for next.js) ou **src** folder as follow :

    .
    ├── locales
      ├── en
        └── translation.json
      ├── fr
        └── translation.json

#### Create the i18n connection

Create a file inside the **src** folder for connecting with the in-context :
Pay attention to the PHRASE_ID variable which was the ID of the project we obtain previously.

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import PhraseInContextEditorPostProcessor from 'i18next-phrase-in-context-editor-post-processor';
import translationFr from 'public/locales/fr/translation.json';
import translationDe from 'public/locales/en/translation.json';

const resources = {
  en: {
    translation: translationFr,
  },
  fr: {
    translation: translationDe,
  },
};

i18n
  .use(initReactI18next)
  .use(
    new PhraseInContextEditorPostProcessor({
      phraseEnabled: true
      projectId: process.env.PHRASE_ID,
    })
  )
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    postProcess: ['phraseInContextEditor'],
  });

export default i18n;
```

#### Import the files in the app

Add this line at the top of your react app in **App.js**

```
import './i18n'
```

#### Use the hook for translating : useTranslation

```js
import { useTranslation } from 'react-i18next'

const Test = () => {
  const { t } = useTranslation()

  return (
    <span>{t('title')}</span>
  )
}

```

#### Use the incontext for translating

Actually, the i18n should already got the result from the json files. But we can also push the traduction to phrase using the incontext if phraseEnabled is at true.

![Alt text](documentation/images/7.png?raw=true "7")

![Alt text](documentation/images/8.png?raw=true "8")

#### In the app application

You can see in the app aplication, the remaining translation to do and the progress of it.
Be aware, it takes around 1 or 2 minutes for the saving to refresh on the app.

![Alt text](documentation/images/6.png?raw=true "6")

#### Install the cli

- Go on the website : https://phrase.com/fr/cli/
- Download the cli executable
- Put it somewhere in your computer
- Create an alias in your bashrc or in the path of your computer

```bash
$ nano ~/.bashrc
$ nano ~/.zshrc
```

```bash
alias phrase='path_to_phrase/phrase'
export PATH="path_to_phrase/phrase:$PATH"
```

#### Initialize the project

At the root of your project, run the following command for creating the **.phrase.yml** with the right variables :

```bash
$ phrase init
```

You can now pull or push the locales files with the following commands :

```bash
$ phrase push
$ phrase pull
```

## Organization
#### Organization of the global folder

    .
    ├── build                   # Compiled files
    ├── documentation           # Documentation files & Images for documentation
    ├── node_modules            # Npm modules
    ├── public                  # Public files
    ├── src                     # Source files
    ├── .eslintignore           # Ignored files for the linter
    ├── .eslintrc.js            # Linter configuration file
    ├── .gitignore              # Ignored files for the repository
    ├── config-overrides        # Override configuration for react
    ├── .phrase.jyml            # The phrase configuration files
    ├── package.json            # Npm configuration file
    ├── package-lock.json       # Npm locker version for module
    ├── LICENSE                 # Description of the license
    └── README.md               # Presentation for the project

#### Organization of the src folder

    .
    ├── components       # Regroup the components used inside the pages
    ├── constants        # Regroup the exported constants
    ├── pages            # Regroup the components representing the pages
    ├── styles           # Regroup the scss files
    ├── App.js           # Router and entry point for the canvas
    ├── index.js         # Entry point for the react app

## Running

For running the API, a single command is needed.

```bash
$ npm run start
$ npm run dev
```

## Commands

- **npm run dev**: Run the development version with a watcher
- **npm run start**: Run the linter and then the project
- **npm run build**: Build the project
- **npm run test**: Run the test of the project
- **npm run eject**: Eject the application (sometimes necessary)
- **npm run linter:fix**: Run the linter and fix the errors
- **npm run build:docs**: Build the documentation from the comments in the code
- **npm run check-update**: Check if the package are up to date (for now, everything is except the testing and webvital)
