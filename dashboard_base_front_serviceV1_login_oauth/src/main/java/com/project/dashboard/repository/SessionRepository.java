package com.project.dashboard.repository;

import com.project.dashboard.session.SessionUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SessionRepository extends CrudRepository<SessionUser, Integer> {

    List<SessionUser> findById(int id);
}
