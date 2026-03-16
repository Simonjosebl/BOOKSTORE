package com.proyectoarqsoft.controller;

import com.proyectoarqsoft.model.Recharge;
import com.proyectoarqsoft.service.RechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recharges")
public class RechargeController {

    @Autowired
    private RechargeService rechargeService;

    @GetMapping
    public List<Recharge> getAllRecharges() {
        return rechargeService.getAllRecharges();
    }

    @GetMapping("/{id}")
    public Recharge getRechargeById(@PathVariable Long id) {
        return rechargeService.getRechargeById(id);
    }

    @PostMapping
    public Recharge createRecharge(@RequestBody Recharge recharge) {
        return rechargeService.createRecharge(recharge);
    }
    
    @DeleteMapping("/{id}")
    public void deleteRecharge(@PathVariable Long id) {
        rechargeService.deleteRecharge(id);
    }
}
