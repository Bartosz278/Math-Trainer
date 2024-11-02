package com.project.mathtrainer.Stat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class StatUpdateDTO {
    private int wrongAnswers;
    private int correctAnswers;
    private int totalQuestions;
}
