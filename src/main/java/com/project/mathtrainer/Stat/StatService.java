package com.project.mathtrainer.Stat;

import com.project.mathtrainer.User.User;
import com.project.mathtrainer.User.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatService {

    @Autowired
    private  UserService userService;

    @Autowired
    private  StatRepository statRepository;

    @Transactional
    public void addGameStat(StatDTO statDTO) {
        User user = userService.getCurrentUser(userService.getLoggedInUsername());

        Stat newStat = new Stat();
        newStat.setUser(user);
        newStat.setWrongAnswers(statDTO.getWrongAnswers());
        newStat.setTotalQuestions(statDTO.getTotalQuestions());
        newStat.setAverageTimePerQuestion(statDTO.getAverageTimePerQuestion());
        newStat.setTotalTime(statDTO.getTotalTime());
        newStat.setDate(statDTO.getDate());

        lvlUp(statDTO.getTotalQuestions());

        statRepository.save(newStat);
    }

    public List<StatDTO> getUserStats() {
        User user = userService.getCurrentUser(userService.getLoggedInUsername());
        List<Stat> stats = statRepository.findAllByUserId(user.getId());
        List<StatDTO> result = new ArrayList<>();
        for(Stat stat : stats) {
            StatDTO statDTO = StatDTO.fromEntity(stat);
            result.add(statDTO);
        }
        return result;
    }
    private void lvlUp(int questions){
        User user = userService.getCurrentUser(userService.getLoggedInUsername());
        user.setQuestionsOnThisLvl(user.getQuestionsOnThisLvl() + questions);

        if(user.getQuestionsOnThisLvl() >= 5 + user.getLvl()){
            user.setQuestionsOnThisLvl(user.getQuestionsOnThisLvl() - (5 + user.getLvl()));
            user.setLvl(user.getLvl() + 1);
        }
    }
}
