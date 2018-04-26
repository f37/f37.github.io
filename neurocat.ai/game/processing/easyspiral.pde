float radius = 1;
float rad = 0;


float radchange;
float change;
int many;

int count=0;

void setup() {
  size(700,700);
background(26,94,33);
  change = 0.01;
  many = 7;
  radchange=0.001;
stroke(201, 230, 200)
}

void draw() {
  for(int i=0;i<many;i++){
      point(width/2+radius*cos(2*PI*rad+i*PI/many),height/2+radius*sin(2*PI*rad+i*PI/many));//probiere alles aus, als ich hier ein sinus mit -1 multipliziert hab kam arch spiral
      point(width/2+radius*sin(2*PI*rad+i*PI/many),height/2+radius*cos(2*PI*rad+i*PI/many));
      point(width/2+radius*cos(2*PI*rad+i*PI/many),height/2+radius*(-1)*sin(2*PI*rad+i*PI/many));
      point(width/2+radius*sin(2*PI*rad+i*PI/many),height/2+radius*(-1)*cos(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*cos(2*PI*rad+i*PI/many),height/2+radius*sin(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*sin(2*PI*rad+i*PI/many),height/2+radius*cos(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*cos(2*PI*rad+i*PI/many),height/2+radius*(-1)*sin(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*sin(2*PI*rad+i*PI/many),height/2+radius*(-1)*cos(2*PI*rad+i*PI/many));
  }
  rad+=radchange;
  radius=height/2*sin(change*(count));
  //if(count%10==0){saveFrame();}
  count++;
}

void movie(int freq){
  if(freq>0){
    if(count%freq==0){saveFrame();}
  }
}

void patternRand(){
  change = random(0.5,0.0005);
  many = int(random(10,37));
}

/*Basis für alles
  point(width/2+radius*cos(2*PI*rad+i*PI/many),height/2+radius*sin(2*PI*rad+i*PI/many));//probiere alles aus, als ich hier ein sinus mit -1 multipliziert hab kam arch spiral
      point(width/2+radius*sin(2*PI*rad+i*PI/many),height/2+radius*cos(2*PI*rad+i*PI/many));
      point(width/2+radius*cos(2*PI*rad+i*PI/many),height/2+radius*(-1)*sin(2*PI*rad+i*PI/many));
      point(width/2+radius*sin(2*PI*rad+i*PI/many),height/2+radius*(-1)*cos(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*cos(2*PI*rad+i*PI/many),height/2+radius*sin(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*sin(2*PI*rad+i*PI/many),height/2+radius*cos(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*cos(2*PI*rad+i*PI/many),height/2+radius*(-1)*sin(2*PI*rad+i*PI/many));
      point(width/2+radius*(-1)*sin(2*PI*rad+i*PI/many),height/2+radius*(-1)*cos(2*PI*rad+i*PI/many));
      */
