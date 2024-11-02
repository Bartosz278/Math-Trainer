package com.project.mathtrainer.Stat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
public class StatController {

    @Autowired
    private StatService statService;

    @GetMapping("/{username}")
    public ResponseEntity<StatDTO>getUserStats(@PathVariable String username) {
        return ResponseEntity.ok(statService.getStatsByUsername(username));
    }

    @PostMapping("/{username}/update")
    public ResponseEntity<String> updateUserStats(@PathVariable String username, @RequestBody StatUpdateDTO updateDTO){
        statService.updateStats(username, updateDTO);
        return ResponseEntity.ok("Stats updated sucessfully");
    }
}
