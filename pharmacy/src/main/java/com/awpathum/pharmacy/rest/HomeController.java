package com.awpathum.pharmacy.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.awpathum.pharmacy.entity.Drug;
import com.awpathum.pharmacy.service.DrugService;
import com.awpathum.pharmacy.service.StockService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://localhost:3000")
public class HomeController {
	
	@Autowired
	private StockService stockService;
	
	@Autowired
	private DrugService drugService;

	@GetMapping("/hello")
	public Map<String,String> hello() {
		HashMap<String, String> map = new HashMap<>();
		map.put("greet","hello");
		return map;
	}

	@GetMapping("/checkStock")
	public List<Drug> checkStock(@RequestParam String username) {
		
		List<Drug>drugs = drugService.getDrugs(username);
		return drugs;
		
	}

	
}
