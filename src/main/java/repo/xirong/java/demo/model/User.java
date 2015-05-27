package repo.xirong.java.demo.model;

import java.util.Date;

/**
 * description:
 * author: xirong
 * date: 2015-05-27
 * version: 1.0
 * copyright 2015 elong Inc ,all rights reserved.
 */
public class User {
    private  int user_id;
    private String name;
    private int age;
    private  int sex ;
    private Date create_time;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }
}
