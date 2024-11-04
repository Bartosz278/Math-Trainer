package com.project.mathtrainer.question;

import com.google.gson.JsonObject;
import com.project.mathtrainer.User.User;
import com.project.mathtrainer.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class QuestionService {

    @Autowired
    private UserService userService;

    private static final String[] OPERATIONS = {"+", "-", "/", "*"};

    private final Random random = new Random();

    public String throwQuestion(){
        String username = userService.getLoggedInUsername();
        User user = userService.getCurrentUser(username);

        return generateQuestion(user);
    }

    private String generateQuestion(User user){
        JsonObject jsonObject = new JsonObject();

        String mathematicalOperation = drawOperation();
        int firstNumber = drawNumber(user);
        int secondNumber = drawNumber(user);
        int result;

        switch(mathematicalOperation){
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                while(secondNumber > firstNumber){
                    secondNumber = drawNumber(user);
                }
                result = firstNumber - secondNumber;
                break;
            case "/":
                while(secondNumber == 0 || firstNumber % secondNumber != 0){
                    secondNumber = drawNumber(user);
                }
                result = firstNumber / secondNumber;
                break;
            case "*":
                result = firstNumber * secondNumber;
                break;
            default:
                System.err.println("Unknown operation");
                return null;
        }
        jsonObject.addProperty("Operation", firstNumber + " " + mathematicalOperation + " " + secondNumber);
        jsonObject.addProperty("Result", result);

        return jsonObject.toString();
    }

    private String drawOperation(){
        int number = random.nextInt(OPERATIONS.length);
        return OPERATIONS[number];
    }

    private int drawNumber(User user){
        return (random.nextInt(10 * user.getLvl()) + 1) + (user.getLvl() * 3);
    }
}
