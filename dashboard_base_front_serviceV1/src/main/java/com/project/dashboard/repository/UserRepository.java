package com.project.dashboard.repository;

import com.project.dashboard.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findById(int id);
}
