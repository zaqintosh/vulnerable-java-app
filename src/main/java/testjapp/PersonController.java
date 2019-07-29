package testjapp;

import testjapp.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class PersonController {

    @Autowired
    private PersonRepository repository;

    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/person")
    public Person person() {
      Person p = repository.findAll().get(1);
      return p;
    }

    @RequestMapping("/everyone")
    public List<Person> everyone() {
      return repository.findAll();
    }

    /* This is extremely dangerous see below */
    
    @RequestMapping("/exec")
    public String execute(@RequestParam String execstring) {
      try {
        Process process = Runtime.getRuntime().exec(execstring);
      } catch (Exception ex) {
         ex.printStackTrace();
      }

      return "Executed something";
    }

    @RequestMapping(method = RequestMethod.POST, value="/person/register")
    public String personRegister(@RequestBody Person person) {
      repository.insert(person);
      return new String("I think it worked");
    }
}
