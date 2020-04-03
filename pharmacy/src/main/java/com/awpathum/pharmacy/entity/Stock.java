package com.awpathum.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "stock")
public class Stock {
	
	@Id
	@Column(name = "id")
	private String id;
	
	@Column(name = "drug_name")
	private String drugName;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "man_date")
	private String manDate;
	
	@Column(name = "res_date")
	private String resDate;
	
	@Column(name = "exp_date")
	private String expDate;
	
	@ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH,CascadeType.REFRESH})	
	@JoinColumn(name = "supplier_id")
	private Supplier supplier;
	
	@ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH,CascadeType.REFRESH})	
	@JoinColumn(name = "drug_id")
	@JsonIgnore
	private Drug drug;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		id = id.replace(",", "");
				this.id = id;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
	
	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getManDate() {
		return manDate;
	}

	public void setManDate(String manDate) {
		this.manDate = manDate;
	}

	public String getResDate() {
		return resDate;
	}

	public void setResDate(String resDate) {
		this.resDate = resDate;
	}

	public String getExpDate() {
		return expDate;
	}

	public void setExpDate(String expDate) {
		this.expDate = expDate;
	}
	
	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}
	

	public Drug getDrug() {
		return drug;
	}

	public void setDrug(Drug drug) {
		this.drug = drug;
	}
	
	

	@Override
	public String toString() {
		return "Stock [id=" + id + ", drugName=" + drugName + ", manDate=" + manDate + ", resDate=" + resDate
				+ ", expDate=" + expDate + ", supplierId=" + "]";
	}
	
	
}
