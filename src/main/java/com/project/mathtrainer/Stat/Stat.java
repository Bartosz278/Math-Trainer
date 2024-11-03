package com.project.mathtrainer.Stat;

import com.project.mathtrainer.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "\"stat\"")
public class Stat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int wrongAnswers;

    private int correctAnswers;

    private int totalQuestions;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
