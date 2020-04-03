package com.awpathum.pharmacy.dao;

import com.awpathum.pharmacy.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends CrudRepository<UserEntity, Integer> {
    UserEntity findByUsername(String username);
}
