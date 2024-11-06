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
    private int totalQuestions;
    private double averageTimePerQuestion;
    private double totalTime;
    private String date;

    public StatDTO(Optional<Stat> stat) {
        this.wrongAnswers = stat.get().getWrongAnswers();
        this.totalQuestions = stat.get().getTotalQuestions();
        this.averageTimePerQuestion = stat.get().getAverageTimePerQuestion();
        this.totalTime = stat.get().getTotalTime();
        this.date = stat.get().getDate();
    }
    public static StatDTO fromEntity(Stat stat) {
        StatDTO statDTO = new StatDTO();

        statDTO.wrongAnswers = stat.getWrongAnswers();
        statDTO.totalQuestions = stat.getTotalQuestions();
        statDTO.averageTimePerQuestion = stat.getAverageTimePerQuestion();
        statDTO.totalTime = stat.getTotalTime();
        statDTO.date = stat.getDate();
        return statDTO;
    }
}
