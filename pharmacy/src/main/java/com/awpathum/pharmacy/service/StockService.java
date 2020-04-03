package com.awpathum.pharmacy.service;

import java.util.List;

import com.awpathum.pharmacy.entity.Stock;
import com.awpathum.pharmacy.entity.Supplier;

public interface StockService {
	

	public List<Stock> getStocks();

	public void saveStock(Stock theStock);

	public Stock getStock(String theId);

	public void deleteStock(String theId);
	
	public void reduceStock(String theId, Integer quantity);

	public List<Stock> getSpecifcStocks(String drugId);

}
