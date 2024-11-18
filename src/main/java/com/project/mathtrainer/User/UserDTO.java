package com.project.mathtrainer.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;

    private String email;

    private boolean isVerified;

    private int lvl;

    private int questionOnThisLvl;
}
