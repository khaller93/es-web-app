/*
  TITLE

  it defines the title of the application, which will
  be visible in the UI, but also as meta information in
  the served HTML code.
*/
title = "Pokémon Explorer"

/*
  SHORT TITLE

  it defines the short title of the application, which
  will be used in the UI for cases, where not enough
  space is given for the full title.
*/
short_title = "Explorér"

/*
  SUPPORTED LANGUAGES

  it defines the number of languages that are supported and might
  be selected (or automatically matched through the browser
  locale information) by the user. If a new language is added
  to the list, a translation file for the application is expected
  in src/i18n/translations. Moreover, it is recommended that the
  accessed knoledge graph has good coverage of descriptive language
  literals for this language. Furthermore, you should provide
  the correct translations in the required places of this
  configuration (e.g. see the categories example in this file).
*/
supported_languages = [
  "en",
  "de"]

/*
   ENABLE FEATURES

   in this section, features can be enabled or explicetely
   disabled. If this section is missing, no extra features
   are enabled.
*/
enable {
  sparql = true,
  treeview = true,
}

/*
  ROLES

  it optionally specifies a number of roles that a user might
  switch too. it is possible to define a different search
  experience for the user based on their selected role.
*/
roles {

  Trainer {
    name {
      en = "Trainer"
      de = "Trainer"
    }
  }

  Ranger {
    name {
      en = "Ranger"
      de = "Pfadfinder"
    }
  }

}

/*
  DEFAULT ROLE

  it specifies the id of the role that a user is assumed to take by
  default.
*/
default_role = "Trainer"

/*
  CATEGORY DEFINITIONS
*/
categories {

  list = [
    "Pokemon",
    "Moves",
    "Berries",
    "Places",
    "Gyms",
    "Regions",
    "Towns",
    "Fields",
    "Oceans"]

  category {

    Pokemon {
      name {
        en = "Pokémon",
        de = "Pokémon",
      }
      classes = [
        "poke:Species"]
    }

    Moves {
      name {
        en = "Moves",
        de = "Züge",
      }
      classes = [
        "poke:Move"]
    }

    Berries {
      name {
        en = "Berries",
        de = "Beeren",
      }
      classes = [
        "poke:Berry"]
    }

    Places {
      name {
        en = "Places",
        de = "Orte",
      }
      classes = [
        "poke:Region"]
    }

    Gyms {
      name {
        en = "Gyms",
        de = "Arena",
      }
      classes = []
    }

    Regions {
      name {
        en = "Regions",
        de = "Regionen",
      }
      classes = []
    }

    Towns {
      name {
        en = "Towns",
        de = "Städte",
      }
      classes = []
    }

    Fields {
      name {
        en = "Fields",
        de = "Felder",
      }
      classes = []
    }

    Oceans {
      name {
        en = "Oceans",
        de = "Meere",
      }
      classes = []
    }
  }
}
