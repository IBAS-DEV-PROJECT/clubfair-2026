/**
 * ==========================================
 * 1. Enums (상수 정의)
 * ==========================================
 */

export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export enum ActionCategory {
  MISSION = 'MISSION',   
  PURCHASE = 'PURCHASE', 
}

export enum ActionDetail {
  // Mission
  TEST = 'TEST',      
  FLLOW = 'FLLOW',
  STORY = 'STORY',   
  GAME = 'GAME',      

  // Purchase
  EVENT = 'EVENT', 
}

export enum ClubFairStatus {
  PRE = 'PRE',       // 사전 기간
  MAIN = 'MAIN',     // 박람회 기간
  AFTER = 'AFTER',   // 결과 조회 기간
  CLOSED = 'CLOSED'  // 종료
}

/**
 * ==========================================
 * 2. Table Entities (DB 테이블 타입)
 * ==========================================
 */

export interface User {
  id: string;             
  phone: string;          
  name: string;           
  instagram_id: string;   
  gender: Gender;         
  
  answers: number[];      
  
  dotori: number;         
  selected_count: number; 
  created_at: string;     
}

export interface UserAction {
  id: number;             
  user_id: string;        
  category: ActionCategory; 
  detail: ActionDetail;   
  change: number;         
  created_at: string;     
}

export interface Match {
  id: number;             
  visitor_id: string;     
  partner_id: string;     
  score: number;          
  created_at: string;     
}

export interface ClubFairSetting {
  id: number;          
  start_at: string;    
  end_at: string;      
  status: ClubFairStatus;
  is_paused: boolean;  
}

/**
 * ==========================================
 * 3. RPC Function Params
 * ==========================================
 */

export interface HandleDotoriParams {
  p_user_id: string;
  p_category: ActionCategory;
  p_detail: ActionDetail;
  p_change: number;
}