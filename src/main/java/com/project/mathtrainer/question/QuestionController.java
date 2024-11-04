package com.project.mathtrainer.question;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/api")
@RestController
@AllArgsConstructor
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/question")
    public String throwQuestion(){
        return questionService.throwQuestion();
    }
}