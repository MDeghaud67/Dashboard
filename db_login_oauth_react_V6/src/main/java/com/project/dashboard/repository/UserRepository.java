package com.project.dashboard.repository;

import com.project.dashboard.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
//ou extends JpaRepository
public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findById(int id);
    //boolean findByEmail(String email);
    //boolean findByPassword(String password);
    List<User> findAll();

    //@Query("SELECT u FROM User u WHERE u.name = ?1")
    User findByName(String name);

    //@Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(String email);

    //@Query("SELECT u FROM User u WHERE u.password = ?1")
    User findByPassword(String password);

}
