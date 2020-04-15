package com.awpathum.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "supplier")
public class Supplier {
	
	@Id
	@Column(name = "id")
	private String id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "location")
	private String location;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "telephone")
	private String telephone;
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "supplier",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH,CascadeType.REFRESH})
	private List<Stock> stocks;
	
	public Supplier() {
		
	}
	
	public Supplier(String id,String name,String location,String email,String telephone) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.email = email;
		this.telephone = telephone;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		id = id.replace(",", "");
				this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public List<Stock> getStocks() {
		return stocks;
	}

	public void setStocks(List<Stock> stocks) {
		this.stocks = stocks;
	}
	
	//add convenience method for bi-directional relationship
	public void add(Stock tempStock) {
		if(stocks == null) {
			stocks = new ArrayList<>();
		}
		stocks.add(tempStock);
		tempStock.setSupplier(this);
	}

	@Override
	public String toString() {
		return "Supplier [id=" + id + ", name=" + name + ", location=" + location + ", email=" + email + ", telephone="
				+ telephone + "]";
	}
	
	
	
}
