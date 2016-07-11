package repo.xirong.java.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import repo.xirong.java.demo.model.User;
import repo.xirong.java.demo.service.TestService;

import java.util.ArrayList;

/**
 * Created by xirong on 15/1/28.
 */
@Controller
public class HomeController {
    @Autowired
    private TestService service;
//
//    @Autowired
//    private OrderStatisticService orderStatisticService;

    @RequestMapping(value="/")
    public ModelAndView index(Model model)
    {
        ModelAndView mv =new ModelAndView();
        mv.setViewName("home");

//        ArrayList<User> users=service.getAllUsers();
//        mv.addObject("userList",users);

        return mv;
    }

    @RequestMapping(value="/test")
    public ModelAndView test(Model model)
    {
        ModelAndView mv =new ModelAndView();
        mv.setViewName("test");

        return mv;
    }

}
