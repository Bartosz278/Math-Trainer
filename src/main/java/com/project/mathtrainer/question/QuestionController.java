package com.project.mathtrainer.question;

import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RequestMapping("/api")
@RestController
public class QuestionController {
    private static final int DRAW_RANGE = 10;
    private static final String[] OPERATIONS = {"+", "-", "/", "*"};
    private final Random random = new Random();
    @GetMapping("/question")
    public String throwQuestion(){
        return generateQuestion();
    }
    private String generateQuestion(){
        JsonObject jsonObject = new JsonObject();

        String mathematicalOperation = drawOperation();
        int firstNumber = drawNumber(DRAW_RANGE);
        int secondNumber = drawNumber(DRAW_RANGE);
        int result;

        switch(mathematicalOperation){
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                while(secondNumber > firstNumber){
                    secondNumber = drawNumber(DRAW_RANGE);
                }
                result = firstNumber - secondNumber;
                break;
            case "/":
                while(secondNumber == 0 || firstNumber % secondNumber != 0){
                    firstNumber = drawNumber(DRAW_RANGE);
                    secondNumber = drawNumber(DRAW_RANGE);
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
    private int drawNumber(int range){
        return random.nextInt(range) + 1;
    }
}
