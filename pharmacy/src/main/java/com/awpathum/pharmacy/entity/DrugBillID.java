package com.awpathum.pharmacy.entity;//package com.awpathum.pharmacy.entity;
//
//import java.io.Serializable;
//
//import javax.persistence.Embeddable;
//
//
//@Embeddable
//public static class DrugBillId implements Serializable {
//	
//	private static final long serialVersionUID = 1L;
//	
//	private String drugId;
//	private String supplierId;
//	
//	public DrugBillId() {
//		
//	}
//	
//	public DrugBillId(String drugId,String supplierId) {
//		
//		super();
//		this.drugId = drugId;
//		this.supplierId = supplierId;
//		
//	}
//
//	public String getDrugId() {
//		return drugId;
//	}
//
//	public void setDrugId(String drugId) {
//		this.drugId = drugId;
//	}
//
//	public String getBillId() {
//		return supplierId;
//	}
//
//	public void setBillId(String supplierId) {
//		this.supplierId = supplierId;
//	}
//
//	public static long getSerialversionuid() {
//		return serialVersionUID;
//	}
//
//	@Override
//	public int hashCode() {
//		final int prime = 31;
//		int result = 1;
//		result = prime * result + ((drugId == null) ? 0 : drugId.hashCode());
//		result = prime * result + ((supplierId == null) ? 0 : supplierId.hashCode());
//		return result;
//	}
//
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		DrugBillId other = (DrugBillId) obj;
//		if (drugId == null) {
//			if (other.drugId != null)
//				return false;
//		} else if (!drugId.equals(other.drugId))
//			return false;
//		if (supplierId == null) {
//			if (other.supplierId != null)
//				return false;
//		} else if (!supplierId.equals(other.supplierId))
//			return false;
//		return true;
//	}
//	
//	
//}
