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

    @PostMapping("/addGameStat")
    public ResponseEntity<String>addGameStat(@RequestBody StatDTO statDTO) {
        statService.addGameStat(statDTO);
        return ResponseEntity.ok("Stats added successfully");
    }

    @GetMapping("/userStats")
    public ResponseEntity<List<StatDTO>> getUserStats() {
        return ResponseEntity.ok(statService.getUserStats());
    }
}
