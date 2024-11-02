package com.project.mathtrainer.Stat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatDTO {
    private int wrongAnswers;
    private int correctAnswers;
    private int totalQuestions;

    public StatDTO(Stat stat) {
        this.wrongAnswers = stat.getWrongAnswers();
        this.correctAnswers = stat.getCorrectAnswers();
        this.totalQuestions = stat.getTotalQuestions();
    }
}
