using UnityEngine;
using System.Collections;

public class DriveScript : MonoBehaviour 
{
	private Rigidbody rb;
	private Vector3 fwd;
	public Transform com; // Center of mass
	[HideInInspector] public int wheelsTouching;
	private RaycastHit hit;
	private bool grounded;
	private bool handling;
	private bool accelerating;
	private bool idle;
	private float speed;
	private float actualSpeed;
	private float maxDebugSpeed;
	private int[] cornering = new int[2];
	
	private Quaternion steeringSide;
	private Vector3 deltaRotation;
	
	private int movingForward;
	
	private	MapScript scrMap;
	
	//	Rewerse/forward
	
	private float previousPos;
	private float currentPos;
	
	[Header("CAR SPECIFICATION")]
	public float wheelRadius;
	public float power;
	public int WheelDrive; // 1 - RWD , 2 - FWD, 3 - 4WD
	public float handlingForce;
	public float steeringRate;
	public float maxSpeed;
	public float accelerationRate;
	
	
	void Start()
	{
		scrMap = GameObject.FindWithTag("MapScriptObj").GetComponent<MapScript>();
		maxDebugSpeed = 0;
		deltaRotation = new Vector3(0,steeringRate,0);
		movingForward = 0;
		rb = GetComponent<Rigidbody>();
		handling = false;
		accelerating = false;
		grounded = false;
	}
	
	void Update()
	{
		rb.centerOfMass = com.localPosition;
		if(scrMap.canDrive)
		{
			deltaRotation = new Vector3(0,steeringRate * rb.velocity.magnitude,0);
			previousPos = currentPos;
			currentPos = transform.localPosition.x;
			if(previousPos > currentPos)
			{
				movingForward = 1;
			}
			if(previousPos < currentPos)
			{
				movingForward = -1;
			}
			if(previousPos == currentPos)
			{
				movingForward = 0;
			}
			if(grounded)
			{
				if(Input.GetKey(KeyCode.UpArrow) && !handling)
				{
					accelerating = true;
				}
				if(Input.GetKeyUp(KeyCode.UpArrow))
				{
					accelerating = false;
				}
				if(Input.GetKey(KeyCode.DownArrow) && !accelerating)
				{
					handling = true;
				}
				if(Input.GetKeyUp(KeyCode.DownArrow))
				{
					handling = false;
				}
				
				if(Input.GetKey(KeyCode.RightArrow))
				{
					cornering[0] = 1;
				}
				if(Input.GetKeyUp(KeyCode.RightArrow))
				{
					cornering[0] = 0;
				}
				if(Input.GetKey(KeyCode.LeftArrow))
				{
					cornering[1] = 1;
				}
				if(Input.GetKeyUp(KeyCode.LeftArrow))
				{
					cornering[1] = 0;
				}
			}
			if(!grounded)
			{
				accelerating = false;
				handling = false;
				cornering[0] = 0;
				cornering[1] = 0;
				maxDebugSpeed = 0;
			}
			if(!accelerating && !handling || !grounded)
			{
				idle = true;
			}
			if(accelerating || handling)
			{
				idle = false;
				maxDebugSpeed = 0;
			}
			if(cornering[0] == 1)
			{
				steeringSide = Quaternion.Euler(deltaRotation * Time.deltaTime);
			}
			if(cornering[1] == 1)
			{
				steeringSide = Quaternion.Euler(deltaRotation * -Time.deltaTime);
			}
			if(cornering[0] == 0 && cornering[1] == 0)
			{
				steeringSide = Quaternion.Euler(deltaRotation * 0);
			}
		}
	}
	
	void FixedUpdate()
	{
		fwd = transform.TransformDirection(Vector3.right);
		actualSpeed = rb.velocity.magnitude;
		if(Physics.Raycast(transform.position, -transform.up, out hit, 2.5f))
		{
			grounded = true;
		}
		if(!Physics.Raycast(transform.position, -transform.up, out hit, 2.5f))
		{
			grounded = false;
		}
		if(accelerating)
		{
			if(rb.velocity.magnitude < maxSpeed)
			{
				if(rb.velocity.magnitude < maxSpeed * 0.25f)
				{
					speed += power * accelerationRate;
				}
				else
				{
					speed += power;
				}
			}
			else
			{
				if(maxDebugSpeed == 0)
				{
					maxDebugSpeed = speed;
				}
				speed = maxDebugSpeed;
				rb.velocity = fwd * maxSpeed;
			}
		}
		if(handling)
		{
			if(maxDebugSpeed == 0)
			{
				maxDebugSpeed = speed;
			}
			if(maxDebugSpeed != 0)
			{
				speed = maxDebugSpeed;
			}
			if(movingForward == 1)
			{
				speed -= handlingForce;
			}
			if(movingForward <= 0)
			{
				speed = 0;
			}
		}
		if(idle)
		{
			if(maxDebugSpeed == 0)
			{
				maxDebugSpeed = speed;
			}
			if(maxDebugSpeed != 0)
			{
				speed = maxDebugSpeed;
			}
			if(speed > 0)
			{
				speed -= handlingForce * 0.2f;
			}
			if(speed < 0)
			{
				speed += handlingForce * 0.2f;
			}
		}
		if(grounded)
		{
			
			if(cornering[0] == 1)
			{
				rb.MoveRotation(rb.rotation * steeringSide);
			}
			if(cornering[1] == 1)
			{
				rb.MoveRotation(rb.rotation * steeringSide);
			}
			
			if(rb.velocity.magnitude > maxSpeed)
			{
				rb.velocity = fwd * maxSpeed;
			}
			if(rb.velocity.magnitude < maxSpeed)
			{
				rb.AddForce(fwd * speed);
			}
		}
	}
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
