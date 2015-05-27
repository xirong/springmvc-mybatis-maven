package repo.xirong.java.demo.mapper;

import repo.xirong.java.demo.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface TestMapper {

    ArrayList<User> getAllUsers ();
}
