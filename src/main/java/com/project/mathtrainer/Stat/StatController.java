package com.project.mathtrainer.Stat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatController {

    @Autowired
    private StatService statService;
    @Autowired
    private StatRepository statRepository;

    //todo potem usunać tylko do debugu
    @GetMapping("/debug")
    public List<Stat> getStats() {
        return statRepository.findAll();
    }


    @GetMapping("")
    public ResponseEntity<StatDTO>getUserStats() {
        return ResponseEntity.ok(statService.getStatsForLoggedInUser());
    }

}
