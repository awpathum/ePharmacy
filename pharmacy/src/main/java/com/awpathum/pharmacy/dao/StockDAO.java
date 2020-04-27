package com.awpathum.pharmacy.dao;

import java.util.List;

import com.awpathum.pharmacy.classes.StockResponse;
import com.awpathum.pharmacy.entity.Stock;
public interface StockDAO {

	public List<StockResponse> getStocks(String username);

	public void saveStock(Stock theStock);

	public Stock getStock(String theId);

	public StockResponse getStockResponse(String theId);

	public void deleteStock(String theId);
	
	public void reduceStock(String theId, Integer quantity);

	public List<Stock> getSpecifcStocks(String drugId);

}
