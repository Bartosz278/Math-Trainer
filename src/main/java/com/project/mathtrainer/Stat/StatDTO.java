package com.project.mathtrainer.Stat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatDTO {
    private int wrongAnswers;
    private int correctAnswers;
    private int totalQuestions;

    public StatDTO(Optional<Stat> stat) {
        this.wrongAnswers = stat.get().getWrongAnswers();
        this.correctAnswers = stat.get().getCorrectAnswers();
        this.totalQuestions = stat.get().getTotalQuestions();
    }
}
