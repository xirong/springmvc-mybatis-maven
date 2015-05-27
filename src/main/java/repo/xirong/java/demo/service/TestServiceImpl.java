package repo.xirong.java.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repo.xirong.java.demo.mapper.TestMapper;
import repo.xirong.java.demo.model.User;

import java.util.ArrayList;

/**
 * description:
 * author: xirong
 * date: 2015-05-27
 * version: 1.0
 * copyright 2015 elong Inc ,all rights reserved.
 */
@Service
public class TestServiceImpl implements TestService{
    @Autowired
    private TestMapper testMapper;

    @Override
    public ArrayList<User> getAllUsers() {
        return testMapper.getAllUsers();
    }
}
