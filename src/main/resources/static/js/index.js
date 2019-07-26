class Application {
  run() {
    var indexPage = new IndexPage();
  }
}


class IndexPage {

  constructor() {
    // state of stuff we care about;
    this.peoplePopulated = false;

    // IDs of  html selectors on page
    this.peopleListID = "#people-list";
    this.peopleLinkID = "#get-person-link";
    this.everyoneLinkID = "#get-everyone-link";
    this.clearLinkID = "#clear-people-link";
    this.savePersonButton = "#save-person";
    this.registerPersonForm = "#register-person-form";
    this.execButton = "#exec-button";
    this.execField = "#exec-string";

    this.setUpCallbacks();
  }

  createPersonListComponent(data) {
    if (typeof data == "undefined") {
      return $("<li class=\"person\">Undefined</li>");
    } else {
      console.log("person: ");
      console.log(data);
      return $("<li class=\"person\">Undefined</li>").text("ssn: " + data.ssn + ", Name: " + data.firstName + " " +
                                                            data.lastName + ", Age: " + data.age + ", Notes: "+ data.notes);
    }
  }

  addEveryone(data) {
    if (typeof data == "undefined") {
      return $("<li class=\"person\">Undefined</li>");
    } else {
      for (var person of data) {
        var $personLI = this.createPersonListComponent(person);
        $(this.peopleListID).append($personLI);
      }
    }
  }

  setUpCallbacks () {
    $(this.peopleLinkID).click(() => {
        $.get('person', (data) => {
          var $personLI = this.createPersonListComponent(data);
          $(this.peopleListID).append($personLI);
          this.peoplePopulated = true;
        });
      }
    );

    $(this.everyoneLinkID).click(() => {
        $.get('everyone', (data) => {
          this.addEveryone(data);
          this.peoplePopulated = true;
        });
      }
    );

    $(this.clearLinkID).click(() => {
      $(this.peopleListID).children().remove();
      this.peoplePopulated = false;
    });

    $(this.savePersonButton).click(() => {
        var newPerson = {
          firstName: $(this.registerPersonForm).find("#firstName").val(),
          lastName: $(this.registerPersonForm).find("#lastName").val(),
          age: parseInt($(this.registerPersonForm).find("#age").val()),
          ssn: $(this.registerPersonForm).find("#ssn").val(),
          notes: $(this.registerPersonForm).find("#notes").val(),
        };

        $.ajax({
          type: "POST",
          url: "/person/register",
          processData: false,
          data: JSON.stringify(newPerson),
          success: function (msg) {console.log(msg); alert("saved!")},
          datatype: "json",
          contentType: "application/json; charset=utf-8",

        });

      }
    );

    $(this.execButton).click(() => {
      $.ajax({
        type: "GET",
        url: "/exec?execstring="+$(this.execField).val()
      });
    });

  } // END SET UP CALLBACKS

}
