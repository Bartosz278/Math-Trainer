package com.project.mathtrainer.Stat;

import com.project.mathtrainer.User.User;
import com.project.mathtrainer.User.UserRepository;
import com.project.mathtrainer.User.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class StatService {

    @Autowired
    private  UserService userService;

    @Autowired
    private  StatRepository statRepository;



    public StatDTO getStatsForLoggedInUser() {
        String username = userService.getLoggedInUsername();
        User loggedInUser = userService.findUserByUsername(username);

        return new StatDTO(
                Optional.ofNullable(statRepository.findByUserId(loggedInUser.getId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Statistics not found for user: " + username)))
        );
    }

    @Transactional
    public void updateStats(StatUpdateDTO statUpdateDTO) {
        Stat stat = statRepository.findByUserId(userService.findUserByUsername(userService.getLoggedInUsername()).getId())
                .orElseGet(() -> initializeNewStatForUser(userService.getLoggedInUsername()));

        stat.setCorrectAnswers(stat.getCorrectAnswers() + statUpdateDTO.getCorrectAnswers());
        stat.setWrongAnswers(stat.getWrongAnswers() + statUpdateDTO.getWrongAnswers());
        stat.setTotalQuestions(stat.getTotalQuestions() + statUpdateDTO.getTotalQuestions());

        statRepository.save(stat);
    }

    public Stat initializeNewStatForUser(String username) {
        User user = userService.getCurrentUser(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + username);
        }
        Stat newStat = new Stat();
        newStat.setUser(user);
        return newStat;
    }
}
