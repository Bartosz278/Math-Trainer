package com.project.mathtrainer.Security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    //todo poka sowe tylko w celach debugowawczych bo mnie już wkurwila ta walidacja
    @GetMapping("/pokaSowe")
    public ResponseEntity<String> pokaSowe(){
        return ResponseEntity.ok("pokaSowe");
    }
}

