using UnityEngine;
using System.Collections;

public class MoveScript : MonoBehaviour 
{
	public float Speed;
	public int Rot;
	public Transform Player;
	private Quaternion rot;
	private Vector3 NewPos;
	private bool Mozna;
	public int[] LimitX; // Min, max
	public int[] LimitZ; // Min, Max
	
	void Start()
	{
		Mozna = false;
		rot = Player.rotation;
		NewPos = new Vector3(Player.position.x,1,Player.position.z);
	}
	
	void Update () 
	{
		if(Vector3.Distance(Player.position,NewPos) < 0.1f)
		{
			CheckPos();
			Mozna = true;
		}
		if(Rot == 0)
		{
			rot[1] = 0;
		}
		if(Rot == 1)
		{
			rot[1] = 99999f;
		}
		if(Rot == 2)
		{
			rot[1] = 1f;
		}
		if(Rot == 3)
		{
			rot[1] = -1f;
		}
		Player.rotation = rot;
		if(Input.GetKey(KeyCode.LeftArrow))
		{
			if(Player.position.x - 1 > LimitX[0])
			{
				if(Mozna)
				{
					Mozna = false;
					Rot = 0;
					NewPos = new Vector3(Player.position.x - 1,1,Player.position.z);
				}
			}
		}
		if(Input.GetKey(KeyCode.RightArrow))
		{
			if(Player.position.x + 1 < LimitX[1])
			{
				if(Mozna)
				{
					Mozna = false;
					Rot = 1;
					NewPos = new Vector3(Player.position.x + 1,1,Player.position.z);
				}
			}
		}
		if(Input.GetKey(KeyCode.UpArrow))
		{
			if(Player.position.z + 1 < LimitZ[1])
			{
				if(Mozna)
				{
					Mozna = false;
					Rot = 2;
					NewPos = new Vector3(Player.position.x,1,Player.position.z + 1);
				}
			}
		}
		if(Input.GetKey(KeyCode.DownArrow))
		{
			if(Player.position.z - 1 > LimitZ[0])
			{
				if(Mozna)
				{
					Mozna = false;
					Rot = 3;
					NewPos = new Vector3(Player.position.x,1,Player.position.z - 1);
				}
			}
		}
		Player.position =  Vector3.Lerp(Player.position, NewPos, Speed);
	}
	void CheckPos()
	{
		float Checker = 0;
		Checker = Mathf.Round(Player.position.x);
		if(Checker > Player.position.x || Checker < Player.position.x)
		{
			Player.position = new Vector3(Checker,Player.position.y,Player.position.z);
		}
		Checker = Mathf.Round(Player.position.y);
		if(Checker > Player.position.y || Checker < Player.position.y)
		{
			Player.position = new Vector3(Player.position.x,Checker,Player.position.z);
		}
		Checker = Mathf.Round(Player.position.z);
		if(Checker > Player.position.z || Checker < Player.position.z)
		{
			Player.position = new Vector3(Player.position.x,Player.position.y,Checker);
		}
	}
		
}
