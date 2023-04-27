/*
  SEARCH CONFIGURATION
*/
search {

  perspective _ {

    /*
      INCLUDE CLASSES

      it specifies a number of classes in form of their IRI
      for telling the application to only consider members
      of those classes for the exploration.
    */
    include_classes = []

    /*
      EXCLUDE CLASSES

      it specifies a number of classes in form of their IRI
      for telling the application to ignore members of those
      classes during search exploration.
    */
    exclude_classes = [
      "http://xmlns.com/foaf/0.1/Image"]

    /*
      SNIPPET CONFIGURATION

      it specifies how the description of a resource shall
      be assembled. Properties for label and description
      shall always be specified (although it is not required),
      while depiction is optional.
    */
    snippet {

      /*
        LABEL

        it defines a set of properties used to gather a label
        for a resource. The order in which the properties are
        stated is relevant for the precedence in being displayed
        to the user.
      */
      label = [
        "http://www.w3.org/2000/01/rdf-schema#label",
        "http://purl.org/dc/terms/title",
      ]

      /*
        DESCRIPTION

        it defines a set of properties used to gather a description
        for a resource. The order in which the properties are
        stated is relevant for the precedence in being displayed
        to the user.
      */
      description = [
        "http://www.w3.org/2000/01/rdf-schema#comment",
        "http://purl.org/dc/terms/description",
        "http://purl.org/dc/terms/abstract",
        "http://pokemon.outofbits.com/ontology#effectDescription",
      ]

      /*
        DEPICTION

        it defines a set of properties used to gather depictions
        for a resource. The order in which the properties are
        stated is relevant for the precedence in being displayed
        to the user.
      */
      depiction = [
        "http://xmlns.com/foaf/0.1/depiction"
      ]
    }

    /*
      RANKING CONFIGURATION

      it specifies the metrics that shall be used to rank resources
      in a list as well as their weight in the total score that
      is then used for ranking.

      Each metric has an unique key that can be choosen by the
      configurator.

      However, 'fts' is reserved and it points to the fulltext
      search score. In this case, no step has to be defined and
      the reason for stating it explicetly might be to change
      the default weight for the total ranking score.
    */
    ranking {
      pagerank {
        step = "esm.exploit.centrality.pagerank"
        weight = 1.0
      }
    }
  }

  perspective Trainer {
    categories = [
      "Pokemon",
      "Moves",
      "Berries",
      "Places",
      "Gyms"]
  }

  perspective Ranger {
    categories = [
      "Regions",
      "Towns",
      "Fields",
      "Oceans"]
  }

}

/*
   TREE VIEW CONFIGURATION

*/
treeview {
  perspective _ {
    views = [
      "Classes"]

    view Classes {
      name {
        en = "Classes"
        de = "Klassen"
      }

      /*
        INCLUDE CLASSES

        it specifies a number of classes in form of their IRI
        for telling the application to only consider members
        of those classes for the exploration.
      */
      include_classes = [
        "http://www.w3.org/2002/07/owl#Class"]

      /*
        EXCLUDE CLASSES

        it specifies a number of classes in form of their IRI
        for telling the application to ignore members of those
        classes during tree view exploration.
      */
      //exclude_classes = []

      /*
         TOP DOWN PROPERTY

         a list of properties indicating that the object
         of the property is a sub of the subject.
      */
      //top_down_properties = []

      /*
         BOTTOM UP PROPERTY

         a list of properties indicating that the subject
         of the property is a sub of the object.
      */
      bottom_up_properties = [
        "http://www.w3.org/2000/01/rdf-schema#subClassOf"]
    }

    default_view = "Classes"
  }
}
