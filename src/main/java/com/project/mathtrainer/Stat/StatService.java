package com.project.mathtrainer.Stat;

import com.project.mathtrainer.User.User;
import com.project.mathtrainer.User.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Transactional
@Service
public class StatService {

    @Autowired
    private UserService userService;

    @Autowired
    private StatRepository statRepository;

    public StatDTO getStatsByUsername(String username) {
        Stat stat = userService.getCurrentUser(username).getStat();
        return new StatDTO(stat);
    }

    public void updateStats(String username, StatUpdateDTO statUpdateDTO) {
        Stat stat = statRepository.findByUser_Username(username)
                .orElseGet(() -> {
                    User user = userService.getCurrentUser(username);
                    if (user == null) {
                        throw new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found: " + username
                        );
                    }
                    Stat newStat = new Stat();
                    newStat.setUser(user);
                    return newStat;
                });

        stat.setCorrectAnswers(stat. getCorrectAnswers() + statUpdateDTO.getCorrectAnswers());
        stat.setWrongAnswers(stat.getWrongAnswers() + statUpdateDTO.getWrongAnswers());
        stat.setTotalQuestions(stat.getTotalQuestions() + statUpdateDTO.getTotalQuestions());

        statRepository.save(stat);
    }
}
